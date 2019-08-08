import React, { Component } from 'react'
import { Modal,Form, Select,Input , message} from 'antd';
import { CreateSubCategory , fetchSubcategories  , loadSubCategories} from "../../store/actions/subcategories";
import { connect } from "react-redux";
const { Option } = Select;

class addSubCategory extends Component {
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
              dispatch(CreateSubCategory({data:values}))
              .then(async()=> {
                let res = await dispatch(fetchSubcategories())
                dispatch(loadSubCategories(res));
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
    let {addvisible , categories} = this.props;
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
      title="Add SubCategory"
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
                message: 'Please enter your SubCategory Name',
                whitespace:true
                }],
            })(
                <Input placeholder="Please enter your SubCategory Name" />
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

function mapStateToProps(state) {
  return {
    categories:state.categories,
  };
}

const AddSubCategoryModal = Form.create({ name: 'validate_other' })(addSubCategory);

export default connect(mapStateToProps)(AddSubCategoryModal)