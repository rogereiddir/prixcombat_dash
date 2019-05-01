import React, { Component } from 'react'
import { Modal,Form, Button, Upload, Icon,Input , message} from 'antd';
import { CreateBrand , fetchBrands,loadBrands} from "../../store/actions/brands";
import { connect } from "react-redux";


class addBrand extends Component {
    state = {
        confirmLoading:false,
        fileList: []
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
      
              dispatch(CreateBrand({data:{...values,picture:values.picture.fileList[0].thumbUrl}}))
              .then(async()=> {
                let res = await dispatch(fetchBrands())
                dispatch(loadBrands(res));
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
                message: 'Please enter your Brand Name',
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your Brand Name" />
            )}
        </Form.Item>
        <Form.Item
          label="Upload"
          extra="Brand picture"
        >
          {getFieldDecorator('picture', {
            rules: [{
             required: true,
             message: 'Please enter your Brand picture',
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

      </Form>
    </Modal>
    )
  }
}

const AddBrandModal = Form.create({ name: 'validate_other' })(addBrand);

export default connect()(AddBrandModal)