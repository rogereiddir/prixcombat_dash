import React, { Component } from 'react'
import { Table , Divider , Button} from 'antd';
import AddProduct from './modals/addProduct';

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action', dataIndex: '', key: 'x', render: (text, record) => ( <span>
        <a href="/">Edit</a>
        <Divider type="vertical" />
        <a href="/">Delete</a>
      </span>),
    },
  ];
  
  const data = [
    {
      key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

export default class productslist extends Component {
    state = {
        selectedRowKeys: [],
        loading: false,
        iconLoading: false,
        visible:false // Check here to configure the default column
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
    return (
      <div>
        <Button onClick={this.toggleshowModal} type="primary" icon="plus">
          Add Product
        </Button>
        <AddProduct toggleshowModal={this.toggleshowModal} visible={this.state.visible} />
        <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
       />
      </div>
    )
  }
}
