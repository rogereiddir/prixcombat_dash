import React from "react";
import { Form, Icon, Input, Button ,Checkbox } from "antd";
import auth from "../hocs/auth";
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
 
  handleSubmit = e => {
    e.preventDefault();
    auth.login(() => { this.props.history.push("/dashboard")})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm
