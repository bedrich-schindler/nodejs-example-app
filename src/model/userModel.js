import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email),
      message: props => `Path \`email\` (\`${props.value}\`) is not a valid email.`,
    },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

UserSchema.plugin(mongooseUniqueValidator);

UserSchema.pre('save', async function save(next) {
  let { password } = this;

  if (password === undefined || password === null) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    this.password = password;

    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(passwordToCompare) {
  const { password } = this;

  return bcrypt.compare(passwordToCompare, password);
};


export default mongoose.model('user', UserSchema);
