import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userLogin } from '../../actions';

const mapDispatchToProps = dispatch => ({
    onUserSignup: (user, token) => {
        dispatch(userLogin(user, token));
    },
});
const Signup = connect(mapDispatchToProps)(SignupForm);

export default Signup;
