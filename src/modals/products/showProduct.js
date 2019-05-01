import React from 'react'
import { Modal , Card} from 'antd';

 const showProduct = (props) => {
    const handleOk = () => {
        props.toggleShowModal()
    }
    const handleCancel = () => {
      console.log('Clicked cancel button');
      props.toggleShowModal()
    }
    let {showvisible , Product} = props;
    return (
    <Modal
      width={800}
      title="Product details"
      visible={showvisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Card title={Product.name}>
        <Card type="inner" title="Price" >
          {Product.price}
        </Card>

        <Card
        type="inner"
        title="Discount Price"
        >
        {Product.discount_price}
        </Card>

        <Card
        type="inner"
        title="Category"
        >
        {Product.category}
        </Card>

        <Card
        type="inner"
        title="SubCategory"
        >
        {Product.subcategory}
        </Card>

        <Card
        type="inner"
        title="Brand"
        >
        {Product.brand}
        </Card>

        <Card
        type="inner"
        title="Product Url"
        >
        {Product.productUrl}
        </Card>

        <Card
        type="inner"
        title="Picture"
        style={{ marginTop: 16 , width: 240 }}
        cover={<img alt="example" src={Product.picture} />}
        >
        </Card>

        <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Description"
        >
        {Product.description}
        </Card>
     </Card>
    </Modal>
    )
}

export default showProduct