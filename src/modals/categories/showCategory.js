import React from 'react'
import { Modal , Card} from 'antd';

 const showCategory = (props) => {
    const handleOk = () => {
        props.toggleShowModal()
    }
    const handleCancel = () => {
      console.log('Clicked cancel button');
      props.toggleShowModal()
    }
    let {showvisible , Category} = props;
    return (
    <Modal
      width={800}
      title="Show Category"
      visible={showvisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Card title={Category.name}>
      <Card
        type="inner"
        title="Slug"
        >
        {Category.slug}
        </Card>
        <Card
        type="inner"
        title="Picture"
        style={{ marginTop: 16 , width: 240 }}
        cover={<img alt="example" src={Category.picture} />}
        >
       
        </Card>
        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Description"
        >
        {Category.description}
        </Card>
     </Card>,
    </Modal>
    )
}

export default showCategory