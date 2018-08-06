import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="square">
                {this.props.value}
            </div>
        );
    }
}

export default Tile
