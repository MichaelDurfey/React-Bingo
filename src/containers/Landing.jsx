import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardMain from './BoardMain';
import { requestStart } from '../actions';
import NavBar from '../components/NavBar';
import Message from '../components/Message';

class Landing extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestStart());
  }

  render() {
    const { lastBall, played, message } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <NavBar lastBall={lastBall} played={played} />
        <Message message={message} />
        <BoardMain />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastBall: state.lastBall,
  played: state.played,
  message: state.message,
});

export default connect(mapStateToProps)(Landing);

Landing.propTypes = {
  lastBall: PropTypes.number.isRequired,
  played: PropTypes.arrayOf(PropTypes.number).isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
