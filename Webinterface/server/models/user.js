var bcrypt = require('bcrypt-nodejs');


// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 3 },
  image: { data: Buffer, contentType: String },
  meta: {
    created_at: { type: Schema.Types.Date, default: Date.now() },
    updated_at: Date
  }
});

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

    // hash the password using our new salt
    bcrypt.hash(user.password, null, null, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
});


userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


var User = mongoose.model('User', userSchema);

module.exports = User;
