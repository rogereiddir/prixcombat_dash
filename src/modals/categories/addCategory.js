import React, { Component } from 'react'
import { Modal,Form, Switch, Button, Upload, Icon,Input , message} from 'antd';
import { CreateCategory , fetchCategories ,loadCategories} from "../../store/actions/categories";
import { connect } from "react-redux";
const { TextArea } = Input;

class addCategory extends Component {
    state = {
        confirmLoading:false,
        fileList: []
    }
    handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const { dispatch } = this.props;
              console.log('Received values of form: ', typeof values);
            
              this.setState({
                confirmLoading: false,
              });
              console.log('Received values of form: ', values);
              
              dispatch(CreateCategory({data:{...values,picture:values.picture.fileList[0].thumbUrl}}))
              .then(async()=> {
                message.success('Created successfully.')
                this.setState({
                  confirmLoading: false,
                });
                let res = await dispatch(fetchCategories())
                dispatch(loadCategories(res));
                this.props.toggleAddModal()
              })
              .catch((err)=> message.error('err') )
            }else{
              this.setState({
                confirmLoading: false,
              });
              message.error('something is wrong');
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

    const props = {
      beforeUpload: () => {
        return false;
      },
      multiple: false,
      className: 'upload-list-inline',
    };
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
                message: 'Please enter your Category Name',
                whitespace:true
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
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your Category Name" />
            )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Category picture"
        >
          {getFieldDecorator('picture', {
            rules: [{
             required: true,
             message: 'Please enter your Category picture',
            }],
            valuePropName: 'setFieldsValue',
          })(
            <Upload name="picture" listType="picture" {...props}>
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
                whitespace:true
                }],
            })(
                <TextArea placeholder="Please enter your Category description" rows={4} /> 
            )}
        </Form.Item>

        <Form.Item
          label="isActive"
        >
          {getFieldDecorator('isActive', { valuePropName: 'checked', initialValue:false })(
            <Switch />
          )}
        </Form.Item>

      </Form>
    </Modal>
    )
  }
}

const AddCategoryModal = Form.create({ name: 'validate_other' })(addCategory);

export default connect()(AddCategoryModal)