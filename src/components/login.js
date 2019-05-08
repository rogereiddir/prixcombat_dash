import React from "react";
import { Form, Icon, Input, Button ,Checkbox , Layout , message } from "antd";
import auth from "../hocs/auth";
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import  {  user_signin  } from "../store/actions/user_auth";
import  {  setCurrentUser , setAuthorizationToken  } from "../store/actions/users";
const FormItem = Form.Item;
const { Content } = Layout;
class NormalLoginForm extends React.Component {
 
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        auth.login(values,() =>  { })
         dispatch(user_signin({data:values}))
        .then(({token , ...user })=>{
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user))
          this.props.history.push('/dashboard');
        }).catch((err)=>{
          message.error(err.error.message)
        })
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
