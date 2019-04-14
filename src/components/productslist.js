import React, { Component } from 'react'
import { Table ,Form, Divider , Button} from 'antd';
import AddProduct from '../modals/addProduct';
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/products";

const FormItem = Form.Item;


const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'age' },
    { title: 'SubCategory', dataIndex: 'subcategory', key: 'subcategory' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Discount Price', dataIndex: 'discount_price', key: 'discount_price' },
    { title: 'InStock', dataIndex: 'inStock', key: 'inStock' },
    { title: 'Views', dataIndex: 'views', key: 'views' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Url', dataIndex: 'productUrl', key: 'productUrl' },
    { title: 'Created', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Action', dataIndex: '', key: 'x', render: () => ( <span>
        <a href="/">Edit</a>
        <Divider type="vertical" />
        <a href="/">Delete</a>
      </span>),
    },
  ];
  
  // const data = [
  //   {
  //     key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  //   },
  //   {
  //     key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  //   },
  //   {
  //     key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  //   },
  // ];

 class productslist extends Component {
    state = {
        pagination: {},
        selectedRowKeys: [],
        loading: false,
        visible:false,
      };
      onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }
      toggleshowModal = () => {
        this.setState({
          visible:!this.state.visible,
        });
      }
    

      componentDidMount() {
        let params = {
          pagination: { page: 1, perPage: 10 },
          sort: { field: 'name' , order: 'ASC' },
          filter: {},
        }
        console.log(params)
        this.props.fetchProducts(params);
      }
      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        let params = {
          pagination: { page: pagination.current, perPage: 10 },
          sort: { field: sorter.field , order: sorter.order === 'ascend' ? 'ASC' : 'DESC' },
          filter: {...filters},
        }
        console.log(params)
        this.props.fetchProducts(params);
      }
    
  render() {
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
            <FormItem  wrapperCol={{ span: 12, offset: 6 }}>
                <Button onClick={this.toggleshowModal} type="primary" icon="plus">
                Add Product
                </Button>
            </FormItem>
        </Form>
       
        <AddProduct toggleshowModal={this.toggleshowModal} visible={this.state.visible} />
        <Table
        size="small"
        rowKey={record => record.uuid}
        columns={columns}
        dataSource={this.state.data}
        pagination={this.state.pagination}
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

export default connect(mapStateToProps, { fetchProducts })(productslist)