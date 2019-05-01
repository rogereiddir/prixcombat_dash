import React, { Component } from 'react'
import { Modal,Form , Button, Upload, Icon,Input , message} from 'antd';
import { CreateShop , fetchShops ,loadShops} from "../../store/actions/shops";
import { connect } from "react-redux";
const { TextArea } = Input;

class addShop extends Component {
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
              dispatch(CreateShop({data:{...values,picture:values.picture.fileList[0].thumbUrl}}))
              .then(async()=> {
                let res = await dispatch(fetchShops())
                dispatch(loadShops(res));
                this.props.toggleAddModal()
                message.success('Created successfully.')
                this.setState({
                  confirmLoading: false,
                });
              })
              .catch((err)=> {
                console.log(err)
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
      title="Add Shop"
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
                message: 'Please enter your Shop Name',
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your Shop Name" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Email">
            {getFieldDecorator('email', {
                rules: [{
                type: 'email', 
                message: 'The input is not valid E-mail!',
                required: true,
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your Shop Email" />
            )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Password">
            {getFieldDecorator('password', {
                rules: [{
                required: true,
                min:8,
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your password" />
            )}
        </Form.Item>
      
        <Form.Item {...formItemLayout} label="Website Url">
            {getFieldDecorator('websiteUrl', {
                rules: [{
                required: true,
                message: 'Please enter your Website Url',
                whitespace:true,
                pattern:/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
                }],
            })(
                <Input placeholder="Please enter your Website Url" />
            )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Shop picture"
        >
          {getFieldDecorator('picture', {
            rules: [{
             required: true,
             message: 'Please enter your Shop picture',
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
                message: 'Please enter your Shop description',
                whitespace:true
                }],
            })(
                <TextArea placeholder="Please enter your Shop description" rows={4} /> 
            )}
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}

const AddShopModal = Form.create({ name: 'validate_other' })(addShop);

export default connect()(AddShopModal)