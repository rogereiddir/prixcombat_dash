import React, { Component } from 'react'
import { Table ,Form , Button , Divider, Badge , Icon , Popconfirm ,message } from 'antd';
import AddShop from '../modals/shops/addShop';
import ShowShop from '../modals/shops/showShop';
import { connect } from "react-redux";
import {isEmpty} from 'underscore';
import { handleTokenErrors } from '../services/errorHandlers';
import { fetchShops  , loadShops , DeleteShop , fetchOneShop } from "../store/actions/shops";
const FormItem = Form.Item;
class shopslist extends Component {
    state = {
        pagination: {},
        selectedRowKeys: [],
        loading:true,
        loadingb:false,
        addvisible:false,
        showvisible:false,
        disabled:true,
        Shop:{}
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
        this.props.fetchShops() 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadShops(res);
          const pagination = { ...this.state.pagination };
          pagination.total = Number(res.total);
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
          pagination: { page: pagination.current, perPage: pagination.pageSize },
          sort: { field: "name" , order: 'ASC' },
          filter: {...filters},
        }
        this.setState({ loading: true });
        this.props.fetchShops(params) 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadShops(res);
        })
        .catch(err => {
          handleTokenErrors(err)
        });
      }
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteShop({ids:e})
        .then( async ()=>{
          let res = await this.props.fetchShops()
          this.props.loadShops(res);
          message.success('Shop Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
          
        }).catch(()=>{
          message.error('Shop not Deleted');
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }

     showShop = async (id) => {
         let res = await this.props.fetchOneShop({id})
         this.setState({Shop:res})
         console.log(this.state.Shop)
         this.toggleShowModal()
     }
      
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Url', dataIndex: 'websiteUrl', key: 'websiteUrl' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
      {
        title: 'Action', dataIndex: '', key: 'x', render: ({id}) => ( <span>
          <Button><Icon type="edit" />Edit</Button>
            <Divider type="vertical" />
          <Button onClick={(e)=>{this.showShop(id)}}><Icon type="eye" />Show</Button>
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
                Add Shop
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
       
        <AddShop toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
        <ShowShop Shop={this.state.Shop} toggleShowModal={this.toggleShowModal} showvisible={this.state.showvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.shops}
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
    shops: state.shops,
  };
}

export default connect(mapStateToProps,{ fetchShops  , loadShops , DeleteShop , fetchOneShop })(shopslist)