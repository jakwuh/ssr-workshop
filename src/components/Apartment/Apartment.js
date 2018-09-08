import React from 'react';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import * as styles from './Apartment.less';
import getFlatType from './helpers/getFlatType';
import getLastUpdated from './helpers/getLastUpdated';

const getContent = (item) =>
    <>
        <p>Цена: ${parseInt(item.price.converted.usd.amount)} / мес.</p>
        <p>{item.contact.owner ? 'Собственник' : 'Агентство'}</p>
        <p>Тип: {getFlatType(item)}</p>
        <p>Обновлено: {getLastUpdated(item)}</p>
        <p>Адрес: {item.location.address}</p>
    </>;

class Apartment extends React.Component {
    state = {
        seen: Boolean(localStorage.getItem(this.props.item.id)),
    };

    toggleItem = e => {
        e.stopPropagation();

        this.setState(prevState => ({
            seen: !prevState.seen,
        }));
    };

    open = () => window.open(this.props.item.url);

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        const { item: { id } } = this.props;
        localStorage.setItem(id, this.state.seen ? '1' : '');
    }

    render() {
        const { item } = this.props;
        const style = this.state.seen ? {} : { background: '#FFF8DC' };
        const title = this.state.seen ? 'Вернуть' : 'Просмотрено';

        return (
            <div className={styles.card}>
                <Card
                    style={style}
                    onClick={this.open}
                    hoverable
                    cover={<img className={styles.img} src={item.photo} alt={item.location.address}/>}
                    bordered={false}
                    actions={[
                        <Button onClick={this.toggleItem} type="primary">{title}</Button>
                    ]}
                >
                    {getContent(item)}
                </Card>
            </div>
        );
    }

}

export default Apartment;
