import React from 'react'
import { Modal , Card} from 'antd';

 const showShop = (props) => {
    const handleOk = () => {
        props.toggleShowModal()
    }
    const handleCancel = () => {
      console.log('Clicked cancel button');
      props.toggleShowModal()
    }
    let {showvisible , Shop} = props;
    return (
    <Modal
      width={800}
      title="Shop Details"
      visible={showvisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Card title={Shop.name}>
      <Card
        type="inner"
        title="Email"
        >
        {Shop.email}
        </Card>
        <Card
        type="inner"
        title="URL"
        style={{ marginTop: 16 }}
        >
        {Shop.websiteUrl}
        </Card>
        <Card
        type="inner"
        title="Picture"
        style={{ marginTop: 16 , width: 240 }}
        cover={<img alt="example" src={Shop.picture} />}
        >
       
        </Card>
        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Description"
        >
        {Shop.description}
        </Card>
     </Card>,
    </Modal>
    )
}

export default showShop