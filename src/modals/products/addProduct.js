import React, { Component } from 'react'
import { Modal,Form, Select, Switch, Button, Upload, Icon,Input,message} from 'antd';
import { connect } from "react-redux";
import { fetchProducts  , loadProducts  , CreateProduct } from "../../store/actions/products";
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
      setTimeout(async () => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            console.log('Received values of form: ', values);
            dispatch(CreateProduct({data:{...values,picture:values.picture.fileList[0].thumbUrl}}))
            .then(async()=> {
              let res = await dispatch(fetchProducts())
              dispatch(loadProducts(res));
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
     
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
  render() {
    let {addvisible , brands , subcategories , categories} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

      const renderOptionBrands = () => {
        return brands.map ((brand, index) =>  <Option key={index} value={brand.id}>{brand.name}</Option>)
      }
      const renderOptionCategory = () => {
        return categories.map ((cat, index) =>  <Option key={index} value={cat.id}>{cat.name}</Option>)
      }
      const renderOptionSubCategory = () => {
        return subcategories.map ((subcat, index) =>  <Option key={index} value={subcat.id}>{subcat.name}</Option>)
      }
    return (
    <Modal
      width={800}
      title="Add Product"
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
                message: 'Please enter your Product Name',
                }],
            })(
                <Input placeholder="Please enter your Product Name" />
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

        <Form.Item
          label="SubCategory"
          hasFeedback
        >
          {getFieldDecorator('SubCategoryId', {
            rules: [
              { required: true, message: 'Please select your product SubCategory!' },
            ],
          })(
            <Select placeholder="Please select a SubCategory">
              {renderOptionSubCategory()}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Brand"
          hasFeedback
        >
          {getFieldDecorator('BrandId', {
            rules: [
              { required: true, message: 'Please select your product Brand!' },
            ],
          })(
            <Select placeholder="Please select a Brand">
               { renderOptionBrands() } 
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Upload"
          extra="Product photo"
        >
          {getFieldDecorator('picture', {
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

function mapStateToProps(state) {
  return {
    brands: state.brands,
    subcategories:state.subcategories,
    categories:state.categories,
    
  };
}

const AddProduct = Form.create({ name: 'validate_other' })(addProduct);

export default connect(mapStateToProps)(AddProduct)