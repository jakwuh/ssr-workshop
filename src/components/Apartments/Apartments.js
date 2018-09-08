import React from 'react';
import { observer } from 'mobx-react';
import Apartment from '../Apartment/Apartment';
import * as styles from './Apartments.less';

@observer
class Apartments extends React.Component {
    componentDidMount() {
        this.props.apartments.fetch();
    }

    render() {
        const { apartments } = this.props;

        const content = apartments.items.map(item => (
            <Apartment key={item.id} item={item}/>
        ));

        return (
            <div className={styles.container}>
                {content}
            </div>
        );
    }
}

export default Apartments;
