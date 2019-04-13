import React, { Component } from 'react'
import { Modal } from 'antd';

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Checkbox,
    Row, Col,
  } from 'antd';
const { Option } = Select;

class addProduct extends Component {

    state = {
        confirmLoading:false
    }
    handleOk = () => {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            confirmLoading: false,
          });
          this.props.toggleshowModal()
        }, 2000);
      }
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.props.toggleshowModal()
      }
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    
      normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }
  render() {
    let {visible} = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
      <div>
        <Modal
          width={800}
          title="Add Product"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
           <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label="Plain Text"
        >
          <span className="ant-form-text">China</span>
        </Form.Item>
        <Form.Item
          label="Select"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="InputNumber"
        >
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> machines</span>
        </Form.Item>

        <Form.Item
          label="Switch"
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </Form.Item>

        <Form.Item
          label="Slider"
        >
          {getFieldDecorator('slider')(
            <Slider marks={{
              0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
            }}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Radio.Group"
        >
          {getFieldDecorator('radio-group')(
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item
          label="Radio.Button"
        >
          {getFieldDecorator('radio-button')(
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item
          label="Checkbox.Group"
        >
          {getFieldDecorator("checkbox-group", {
            initialValue: ["A", "B"],
          })(
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                <Col span={8}><Checkbox disabled value="B">B</Checkbox></Col>
                <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                <Col span={8}><Checkbox value="E">E</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item
          label="Upload"
          extra="Product photo"
        >
          {getFieldDecorator('upload', {
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
        <Form.Item
          wrapperCol={{ span: 12, offset: 6 }}
        >
        </Form.Item>
      </Form>
        </Modal>
      </div>
    )
  }
}

const AddProduct = Form.create({ name: 'validate_other' })(addProduct);

export default AddProduct