import React, { Component } from 'react'
import { Modal,Form,Button,Input,Select, message} from 'antd';
import { UpdateSubCategory , fetchSubcategories  , loadSubCategories} from "../../store/actions/subcategories";
import { connect } from "react-redux";
const { Option } = Select;

class editSubCategory extends Component {
    state = {
        confirmLoading:false,
        fileList: []
    }
    handleOk = () => {
      let {SubCategory} = this.props;
        this.setState({
          confirmLoading: true,
        });
        setTimeout(async () => {
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const { dispatch } = this.props;
              console.log('Received values of form: ', values);
              const data = {...values,id:SubCategory.id} 
              dispatch(UpdateSubCategory({data}))
              .then(async()=> {
                let res = await dispatch(fetchSubcategories())
                dispatch(loadSubCategories(res));
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
    let {editvisible , SubCategory , categories} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state
    const renderOptionCategory = () => {
      return categories.map ((cat, index) =>  <Option key={index} value={cat.id}>{cat.name}</Option>)
    }
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
                initialValue:SubCategory.name
            })(
                <Input  placeholder="Please enter your SubCategory Name" />
            )}
        </Form.Item>
        <Form.Item
          label="Category"
          hasFeedback
        >
          {getFieldDecorator('CategoryId', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
            initialValue:SubCategory.CategoryId
          })(
            <Select placeholder="Please select a Category">
             {renderOptionCategory()}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}

const EditSubCategoryModal = Form.create({ name: 'validate_other' })(editSubCategory);
function mapStateToProps(state) {
  return {
    categories:state.categories,
  };
}
export default connect(mapStateToProps)(EditSubCategoryModal)