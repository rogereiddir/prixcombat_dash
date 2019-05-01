import React from 'react'
import { Modal , Card} from 'antd';

 const showBrand = (props) => {
    const handleOk = () => {
        props.toggleShowModal()
    }
    const handleCancel = () => {
      console.log('Clicked cancel button');
      props.toggleShowModal()
    }
    let {showvisible , Brand} = props;
    return (
    <Modal
      width={800}
      title="Show Brand"
      visible={showvisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Card title={Brand.name}>
        <Card
        type="inner"
        title="Picture"
        style={{ marginTop: 16 , width: 240 }}
        cover={<img alt="example" src={Brand.picture} />}
        >
       
        </Card>
     </Card>,
    </Modal>
    )
}

export default showBrand