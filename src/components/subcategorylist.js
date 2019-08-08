import React, { Component } from 'react'
import { Table ,Form , Button , Badge , Icon , Popconfirm ,message } from 'antd';
import { connect } from "react-redux";
import {isEmpty} from 'underscore';
import AddSubCategory from '../modals/subcategories/addSubCategory'
import EditSubCategory from '../modals/subcategories/editSubCategory'
import { fetchSubcategories  , loadSubCategories , DeleteSubCategory , fetchOneSubCategory } from "../store/actions/subcategories";

const FormItem = Form.Item;

class subcategorylist extends Component {
    state = {
        pagination: {},
        selectedRowKeys: [],
        loading:true,
        loadingb:false,
        addvisible:false,
        showvisible:false,
        editvisible:false,
        disabled:true,
        SubCategory:{}
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
      toggleEditModal = () => {
        this.setState({
          editvisible:!this.state.editvisible,
        });
      }
      componentDidMount() {
        this.props.fetchSubcategories() 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadSubCategories(res);
          const pagination = { ...this.state.pagination };
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
        this.props.fetchSubcategories(params) 
        .then(res => {
          this.setState({ loading: false });
          this.props.loadSubCategories(res);
        })
        .catch(err => {
          console.log(err)
        });
      }
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteSubCategory({ids:e})
        .then( async ()=>{
          let res = await this.props.fetchSubcategories()
          this.props.loadSubCategories(res);
          message.success('Category Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
          
        }).catch(()=>{
          message.error('Category not Deleted');
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }

     EditSubCategory = async (id) => {
      let res = await this.props.fetchOneSubCategory({id})
      this.setState({SubCategory:res})
      this.toggleEditModal()
    }
      
  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
      {
        title: 'Action', dataIndex: '', key: 'x', render: ({id}) => ( <span>
          <Button onClick={(e)=>{this.EditSubCategory(id)}}><Icon type="edit" />Edit</Button>
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
                Add SubCategory
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
       
      <AddSubCategory toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
      <EditSubCategory SubCategory={this.state.SubCategory} toggleEditModal={this.toggleEditModal} editvisible={this.state.editvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.subcategories}
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
    subcategories: state.subcategories,
  };
}

export default connect(mapStateToProps,{ fetchSubcategories  , loadSubCategories , DeleteSubCategory , fetchOneSubCategory })(subcategorylist)