import React, { Component } from 'react'
import { Table ,Form , Button , Divider, Badge , Icon , Popconfirm ,message } from 'antd';
import AddProduct from '../modals/products/addProduct';
import ShowProduct from '../modals/products/showProduct';
import { connect } from "react-redux";
import { fetchProducts  , loadProducts  , DeleteProduct , fetchOneProduct  } from "../store/actions/products";
import { toggleIsLoading } from "../store/actions/isLoading";
import {isEmpty} from 'underscore'
const FormItem = Form.Item;

class productslist extends Component {
    state = {
        selectedRowKeys: [],
        loading:true,
        loadingb:false,
        addvisible:false,
        showvisible:false,
        disabled:true,
        Product :{}
      };
      
      onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys , disabled:false });
        if(isEmpty(selectedRowKeys)){
          this.setState({ disabled:true })
        }
      }
      toggleAddModal = () => {
        this.setState({
          addvisible:!this.state.addvisible,
        });
      }

      toggleShowModal = () => {
        this.setState({
          showvisible:!this.state.showvisible,
        });
      }
    
      componentDidMount() {
        this.props.fetchProducts()
        this.setState({ loading:false })
      }
      
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteProduct({ids:e})
        .then( async ()=>{
          let res = await this.props.fetchCategories()
          this.props.loadProducts(res);
          message.success('Product Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
        }).catch(()=>{
          message.error('Product not Deleted');
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }

     ShowProduct = async (id) => {
         let res = await this.props.fetchOneProduct({id})
         this.setState({Product:res})
         console.log(this.state.Product)
         this.toggleShowModal()
     }
      
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Category', dataIndex: 'category', key: 'age' },
      { title: 'SubCategory', dataIndex: 'subcategory', key: 'subcategory' },
      { title: 'Price', dataIndex: 'price', key: 'price' },
      { title: 'Discount Price', dataIndex: 'discount_price', key: 'discount_price' },
      {
        title: 'InStock', dataIndex: 'inStock', key: 'inStock', render: (record) => (
        record === true ?  
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : 
        <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" /> ),
      },
      { title: 'Views', dataIndex: 'views', key: 'views' },
      { title: 'Brand', dataIndex: 'brand', key: 'brand' },
      { title: 'Url', dataIndex: 'productUrl', key: 'productUrl' },
      { title: 'Created', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated', dataIndex: 'updatedAt', key: 'updatedAt' },
      {
        title: 'Action', dataIndex: '', key: 'x', render: ({id}) => ( <span>
          <Button><Icon type="edit" />Edit</Button>
            <Divider type="vertical" />
          <Button onClick={(e)=>{this.ShowProduct(id)}}><Icon type="eye" />Show</Button>
        </span>),
        width:200
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [{
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        }],
        onSelection: this.onSelection,
      };
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
      <div>
        <Form  {...formItemLayout} layout="inline">
            <FormItem  wrapperCol={{ span: 12, offset: 0 }}>
                <Button onClick={this.toggleAddModal} type="primary" icon="plus">
                 Add Product
                </Button>
            </FormItem>
            <FormItem>
            <Popconfirm title="Are you sure?" onConfirm={ (e) => this.confirm(this.state.selectedRowKeys)} onCancel={this.cancel} okText="Yes" cancelText="No">
            <Badge count={this.state.selectedRowKeys.length}>
              <Button disabled={this.state.disabled} type="danger" loading={this.state.loadingb}>
                Delete                      
              </Button>
            </Badge>
            </Popconfirm>
            </FormItem>
        </Form>
       
        <AddProduct toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
        <ShowProduct Product={this.state.Product} toggleShowModal={this.toggleShowModal} showvisible={this.state.showvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.products}
          rowSelection={rowSelection}
          loading={this.state.loading}
          onChange={this.handleTableChange}
       />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps, { fetchProducts  , loadProducts  , DeleteProduct , fetchOneProduct , toggleIsLoading })(productslist)