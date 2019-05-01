import React, { Component } from 'react'
import { Modal,Form, Switch,Input,Select , message} from 'antd';
import { CreateUser , fetchUsers ,loadUsers} from "../../store/actions/users";
import { connect } from "react-redux";
const { Option } = Select;
class addUser extends Component {
    state = {
        confirmLoading:false,
    }
    handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(async () => {
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const { dispatch } = this.props;
              console.log('Received values of form: ', values);
              dispatch(CreateUser({data:values}))
              .then(async()=> {
                let res = await dispatch(fetchUsers())
                dispatch(loadUsers(res));
                this.props.toggleAddModal()
                message.success('Created successfully.')
                this.setState({
                  confirmLoading: false,
                });
              })
              .catch((err)=> {
                message.error('oops something is wrong')
                this.setState({
                  confirmLoading: false,
                });
              })
            }else{
              this.setState({
                confirmLoading: false,
              });
              message.error('oops something is wrong');
            }
          });
        }, 2000);
    }
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.props.toggleAddModal()
    }
  render() {
    let {addvisible} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
    <Modal
      width={800}
      title="Add Category"
      visible={addvisible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
    <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
                rules: [{
                required: true,
                message: "Please enter your User's Name",
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your User's Name" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="User Name">
            {getFieldDecorator('username', {
                rules: [{
                required: true,
                message: 'Please enter your User Name',
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your User Name" />
            )}
        </Form.Item>
        
        <Form.Item
          label="Email"
        >
        {getFieldDecorator('email', {
                rules: [{
                required: true,
                message: 'Please enter your User email',
                whitespace:true
                }],
            })(
              <Input placeholder="Please enter your User email" />
            )}
        </Form.Item>

        <Form.Item
          label="Password"
        >
        {getFieldDecorator('password', {
                rules: [{
                required: true,
                message: 'Please enter your User password',
                whitespace:true
                }],
            })(
              <Input placeholder="Please enter your User password" />
            )}
        </Form.Item>

        <Form.Item
          label="isAdmin"
        >
          {getFieldDecorator('isAdmin', { valuePropName: 'checked', initialValue:false })(
            <Switch />
          )}
        </Form.Item>

        <Form.Item
          label="Role"
          hasFeedback
        >
          {getFieldDecorator('role', {
            rules: [
              { required: true, message: 'Please select your Role!' },
            ],
          })(
            <Select placeholder="Please select a Role">
              <Option value="shop">shop</Option>
              <Option value="admin">admin</Option>
              <Option value="member">member</Option>
            </Select>
          )}
        </Form.Item>

      </Form>
    </Modal>
    )
  }
}

const AddUserModal = Form.create({ name: 'validate_other' })(addUser);

export default connect()(AddUserModal)