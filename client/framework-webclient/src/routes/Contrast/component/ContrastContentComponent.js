import React, {Component, PropTypes} from 'react';
import {Form,Button} from 'antd'
const FormItem=Form.Item;
class ContrastContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
    };

    static propTypes = {
        buttons: PropTypes.array.isRequired
    };

    render() {
        const formItemLayout =  {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}>
                    {this.props.buttons.map((button, index) =>
                        <Button onClick={this.onClick(index)}
                                key={button.content}>
                            {button.content}
                        </Button>)}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(ContrastContentComponent);
