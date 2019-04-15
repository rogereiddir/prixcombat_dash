import React, { Component } from 'react'
import { Table ,Form, Divider , Button , Icon} from 'antd';
import AddCategory from '../modals/addCategory';
import { connect } from "react-redux";
import { fetchCategories } from "../store/actions/categories";

const FormItem = Form.Item;


const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'IsActive', dataIndex: 'isActive', key: 'isActive', render: (record) => (
      record === true ?  
      <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : 
      <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" /> ),
    },
    { title: 'Created', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Action', dataIndex: '', key: 'x', render: ({record}) => ( <span>
        <a href="/">Edit</a>
        <Divider type="vertical" />
        <a href="/">Delete</a>
      </span>),
    },
  ];
  
 class categorylist extends Component {
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
        this.props.fetchCategories(params);
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
        this.props.fetchCategories(params);
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
            <FormItem  wrapperCol={{ span: 12, offset: 0 }}>
                <Button onClick={this.toggleshowModal} type="primary" icon="plus">
                Add Category
                </Button>
            </FormItem>
            <FormItem  wrapperCol={{ span: 12, offset: 0 }}>
                <Button onClick={this.toggleshowModal} type="primary" icon="eye">
                Show Category
                </Button>
            </FormItem>
        </Form>
       
        <AddCategory toggleshowModal={this.toggleshowModal} visible={this.state.visible} />
        <Table
        size="small"
        rowKey={record => record.id}
        columns={columns}
        dataSource={this.props.categories}
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
    categories: state.categories,
  };
}

export default connect(mapStateToProps, { fetchCategories })(categorylist)