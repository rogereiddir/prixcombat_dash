import React, { Component } from 'react'
import { Table ,Form , Button , Badge , Icon , Popconfirm ,message } from 'antd';
import AddBrand from '../modals/brands/addBrand';
import { connect } from "react-redux";
import {isEmpty} from 'underscore';
import { fetchBrands  , loadBrands  , DeleteBrand , fetchOneBrand  }from "../store/actions/brands";
import { handleTokenErrors } from '../services/errorHandlers';
const FormItem = Form.Item;

class brandslist extends Component {
    state = {
        pagination: {},
        selectedRowKeys: [],
        loading:true,
        loadingb:false,
        addvisible:false,
        showvisible:false,
        disabled:true,
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
        this.props.fetchBrands() 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadBrands(res);
          const pagination = { ...this.state.pagination };
         
          pagination.total = Number(res.range);
          this.setState({
            pagination,
          });
        })
        .catch(err => {
          handleTokenErrors(err)
        });  
      }
      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        let params = {
          pagination: { page: pagination.current, perPage: pagination.pageSize + 1 },
          sort: { field: "name" , order: 'ASC' },
          filter: {...filters},
        }
        this.setState({ loading: true });
        console.log(params)
        this.props.fetchBrands(params) 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadBrands(res);
        })
        .catch(err => {
          handleTokenErrors(err)
        });
      }
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteBrand({ids:e})
        .then( async ()=>{
          let res = await this.props.fetchBrands()
          this.props.loadBrands(res);
          message.success('Brand Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
          
        }).catch(()=>{
          message.error('Brand not Deleted');
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }
      
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
      {
        title: 'Action', dataIndex: '', key: 'x', render: ({id}) => ( <span>
          <Button><Icon type="edit" />Edit</Button>
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
                Add Brand
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
       
        <AddBrand toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.brands}
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
    brands: state.brands,
  };
}

export default connect(mapStateToProps,{ fetchBrands  , loadBrands  , DeleteBrand , fetchOneBrand  } )(brandslist)