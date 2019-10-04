import React from "react";
import { Form, Icon, Input, Button ,Checkbox , Layout , message, Modal } from "antd";
import Cookies from 'universal-cookie';
import jwtDecode from "jwt-decode";
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import  {  user_signin  } from "../store/actions/user_auth";
import  {  shop_signin  } from "../store/actions/shop_auth";
import  {  setCurrentUser   } from "../store/actions/users";
const FormItem = Form.Item;
const { Content } = Layout;
const cookies = new Cookies();


class NormalLoginForm extends React.Component {
  error(title,content) {
    Modal.error({
      title,
      content
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let {username} = values;
        if(username ==='admin'){
          dispatch(user_signin({data:values}))
          .then(({successMessage})=>{
            console.log(successMessage)
            message.success(successMessage)
            dispatch(setCurrentUser(jwtDecode(cookies.get('access'))))
            localStorage.setItem("uuid",jwtDecode(cookies.get('access')).id)
            this.props.history.push('/dashboard');
          }).catch(({data})=>{
            this.error('This is an error message',data.error.message)
          })
        }else{
          dispatch(shop_signin({data:values}))
          .then(({successMessage})=>{
            message.success(successMessage)
            dispatch(setCurrentUser(jwtDecode(cookies.get('access'))))           
            localStorage.setItem("uuid",jwtDecode(cookies.get('access')).id)
            this.props.history.push('/dashboard');
          }).catch(({data})=>{
            this.error('This is an error message',data.error.message)
          })

        }
      }
    });
   }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Content style={{ margin: '100px 300px' }}>
          <div style={{ padding: 250, background: '#fff', minHeight: 360 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" },
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input your Password!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
          </div>
        </Content>
      </Layout>
      </Layout>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default withRouter(connect()(WrappedNormalLoginForm ))
