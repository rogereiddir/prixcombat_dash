import React, { Component } from 'react'
import { Table ,Form , Button , Badge , Icon , Popconfirm ,message } from 'antd';
import AddUser from '../modals/users/addUser';
import { connect } from "react-redux";
import { fetchUsers  , loadUsers , DeleteUser  } from "../store/actions/users";
import { toggleIsLoading } from "../store/actions/isLoading";
import {isEmpty} from 'underscore'
const FormItem = Form.Item;

class usersList extends Component {
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
        this.props.fetchUsers() 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadUsers(res);
          const pagination = { ...this.state.pagination };
          console.log(res)
          pagination.total = Number(res.total);
          this.setState({
            pagination,
          });
        })
        .catch(err => {
          console.log(err)
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
        this.props.fetchUsers(params) 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadUsers(res);
        })
        .catch(err => {
          console.log(err)
        });
      }
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteUser({ids:e})
        .then( async ()=>{
          let res = await this.props.fetchUsers()
          this.props.loadUsers(res);
          message.success('Users Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
          
        }).catch(()=>{
          message.error('Users not Deleted');
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }
      
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'User Name', dataIndex: 'username', key: 'username' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Role', dataIndex: 'role', key: 'role' },
      {
        title: 'isAdmin', dataIndex: 'isAdmin', key: 'isAdmin', render: (record) => (
        record === true ?  
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : 
        <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eb2f96" /> ),
      },
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
                Add User
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
       
        <AddUser toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.users}
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
    users: state.users,
  };
}

export default connect(mapStateToProps, { fetchUsers  ,toggleIsLoading, loadUsers , DeleteUser  } )(usersList)