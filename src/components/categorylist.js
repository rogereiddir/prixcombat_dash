import React, { Component } from 'react'
import { Table ,Form , Button , Divider, Badge , Icon , Popconfirm ,message } from 'antd';
import AddCategory from '../modals/categories/addCategory';
import ShowCategory from '../modals/categories/showCategory';
import EditCategory from '../modals/categories/editCategory';
import { connect } from "react-redux";
import { fetchCategories  , DeleteCategory , fetchOneCategory } from "../store/actions/categories";
import { toggleIsLoading } from "../store/actions/isLoading";
import {isEmpty} from 'underscore'
const FormItem = Form.Item;

class categorylist extends Component {
    state = {
        selectedRowKeys: [],
        loading:true,
        loadingb:false,
        addvisible:false,
        showvisible:false,
        editvisible:false,
        disabled:true,
        Category:{}
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
        this.props.fetchCategories() 
        this.setState({ loading:false })
      }
     
       confirm = (e) => {
        this.setState({ loading: true });
        this.props.DeleteCategory({ids:e})
        .then( async ()=>{
          this.props.fetchCategories()
          // this.props.loadCategories(res);
          message.success('Category Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
          
        }).catch(()=>{
          message.error('Category not Deleted');
          this.setState({ loading: false , disabled:true ,selectedRowKeys:[]});
        });
      }
     cancel = (e) => {
          message.error('Canceled');
          this.setState({ disabled:true ,selectedRowKeys:[]});
     }

     ShowCategory = async (id) => {
         let res = await this.props.fetchOneCategory({id})
         this.setState({Category:res})
         console.log(this.state.Category)
         this.toggleShowModal()
     }
     EditCategory = async (id) => {
      let res = await this.props.fetchOneCategory({id})
      this.setState({Category:res})
      this.toggleEditModal()
    }
      
  render() {
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
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
      {
        title: 'Action', dataIndex: '', key: 'x', render: ({id}) => ( <span>
          <Button onClick={(e)=>{this.EditCategory(id)}}><Icon type="edit" />Edit</Button>
            <Divider type="vertical" />
          <Button onClick={(e)=>{this.ShowCategory(id)}}><Icon type="eye" />Show</Button>
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
                Add Category
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
       
        <AddCategory toggleAddModal={this.toggleAddModal} addvisible={this.state.addvisible} />
        <ShowCategory Category={this.state.Category} toggleShowModal={this.toggleShowModal} showvisible={this.state.showvisible} />
        <EditCategory Category={this.state.Category} toggleEditModal={this.toggleEditModal} editvisible={this.state.editvisible} />
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.props.categories}
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

export default connect(mapStateToProps, { fetchCategories ,toggleIsLoading, DeleteCategory  ,fetchOneCategory })(categorylist)