import React, { Component } from 'react'
import { Modal,Form, Switch, Button, Upload, Icon,Input} from 'antd';

const { TextArea } = Input;

class addCategory extends Component {
    state = {
        confirmLoading:false
    }
    handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              this.setState({
                confirmLoading: false,
              });
              this.props.toggleshowModal()
            }
            console.log(err)
            this.setState({
              confirmLoading: false,
            });
          });
        }, 2000);
      }
    
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.props.toggleshowModal()
    }
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
  render() {
    let {visible} = this.props;
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
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
    >
    <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
                rules: [{
                required: true,
                message: 'Please enter your Category Name',
                }],
            })(
                <Input placeholder="Please enter your Category Name" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Slug">
            {getFieldDecorator('slug', {
                rules: [{
                required: true,
                message: 'Please enter your Category Name',
                }],
            })(
                <Input placeholder="Please enter your Category Name" />
            )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Category picture"
        >
          {getFieldDecorator('upload', {
            rules: [{
             required: true,
             message: 'Please enter your Category picture',
            }],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        
        <Form.Item
          label="Description"
        >
        {getFieldDecorator('description', {
                rules: [{
                required: true,
                message: 'Please enter your Category description',
                }],
            })(
                <TextArea placeholder="Please enter your Category description" rows={4} /> 
            )}
        </Form.Item>

        <Form.Item
          label="IsActive"
        >
          {getFieldDecorator('IsActive', { valuePropName: 'checked' })(
            <Switch />
          )}
        </Form.Item>

      </Form>
    </Modal>
    )
  }
}

const AddCategory = Form.create({ name: 'validate_other' })(addCategory);

export default AddCategory