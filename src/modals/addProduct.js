import React, { Component } from 'react'
import { Modal,Form, Select, Switch, Button, Upload, Icon,Input} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
class addProduct extends Component {
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
      title="Add Product"
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
                message: 'Please enter your Product Name',
                }],
            })(
                <Input placeholder="Please enter your Product Name" />
            )}
        </Form.Item>
    
        <Form.Item
          label="Category"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="SubCategory"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your product SubCategory!' },
            ],
          })(
            <Select placeholder="Please select a SubCategory">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Brand"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your product Brand!' },
            ],
          })(
            <Select placeholder="Please select a Brand">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Price">
            {getFieldDecorator('price', {
                rules: [{
                required: true,
                message: 'Please enter your Product Price',
                }],
            })(
                <Input placeholder="Please enter your Product Price" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Discount Price">
            {getFieldDecorator('discount_price', {
                rules: [{
                required: true,
                message: 'Please enter your Product Discount Price',
                }],
            })(
                <Input placeholder="Please enter your Product Discount Price" />
            )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Product photo"
        >
          {getFieldDecorator('upload', {
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

        <Form.Item {...formItemLayout} label="Product Url">
            {getFieldDecorator('productUrl', {
                rules: [{
                required: true,
                message: 'Please enter your Product Url',
                }],
            })(
                <Input placeholder="Please enter your Product Url" />
            )}
        </Form.Item>

        <Form.Item
          label="InStock"
        >
          {getFieldDecorator('InStock', { valuePropName: 'checked' })(
            <Switch />
          )}
        </Form.Item>

        <Form.Item
          label="Description"
        >
        {getFieldDecorator('description', {
                rules: [{
                required: true,
                message: 'Please enter your Product description',
                }],
            })(
                <TextArea placeholder="Please enter your Product description" rows={4} /> 
            )}
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}

const AddProduct = Form.create({ name: 'validate_other' })(addProduct);

export default AddProduct