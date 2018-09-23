import SignupForm from './SignupForm';
import { userLogin } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.user,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserSignup: (user, token) => {
            dispatch(userLogin(user, token));
        }
    }
}
const Signup = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);

export default Signup;