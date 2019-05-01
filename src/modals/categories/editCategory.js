import React, { Component } from 'react'
import { Modal,Form, Switch, Button, Upload, Icon,Input , message} from 'antd';
import { UpdateCategory , fetchCategories ,loadCategories} from "../../store/actions/categories";
import { connect } from "react-redux";
const { TextArea } = Input;

class editCategory extends Component {
    state = {
        confirmLoading:false,
        fileList: []
    }
    handleOk = () => {
      let {Category} = this.props;
        this.setState({
          confirmLoading: true,
        });
        setTimeout(async () => {
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const { dispatch } = this.props;
              console.log('Received values of form: ', values);
              const data = values.picture === Category.picture ? 
               {...values,id:Category.id} :
               {...values,id:Category.id,picture:values.picture.fileList[0].thumbUrl}
              dispatch(UpdateCategory({data}))
              .then(async()=> {
                let res = await dispatch(fetchCategories())
                dispatch(loadCategories(res));
                this.props.toggleEditModal()
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
      this.props.toggleEditModal()
    }
  render() {
    let {editvisible , Category} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state

    const props = {
      beforeUpload: () => {
        return false;
      },
      multiple: false
    };
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
    <Modal
      width={800}
      title="Edit Category"
      visible={editvisible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" onClick={this.handleCancel}>Return</Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
          Save
        </Button>,
      ]}
    >
    <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
                rules: [{
                required: true,
                message: 'Please enter your Category Name',
                whitespace:true
                }],
                initialValue:Category.name
            })(
                <Input  placeholder="Please enter your Category Name" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Slug">
            {getFieldDecorator('slug', {
                rules: [{
                required: true,
                message: 'Please enter your Category Name',
                whitespace:true
                }],
                initialValue:Category.slug
            })(
                <Input placeholder="Please enter your Category Name" />
            )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Category picture"
        >
          {getFieldDecorator('picture', {
            valuePropName: 'setFieldsValue',
            initialValue:Category.picture
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
                initialValue:Category.description
            })(
                <TextArea placeholder="Please enter your Category description" rows={4} /> 
            )}
        </Form.Item>

        <Form.Item
          label="isActive"
        >
          {getFieldDecorator('isActive', { valuePropName: 'checked', initialValue:Category.isActive })(
            <Switch />
          )}
        </Form.Item>

      </Form>
    </Modal>
    )
  }
}

const EditCategoryModal = Form.create({ name: 'validate_other' })(editCategory);

export default connect()(EditCategoryModal)