let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

TodoSchema.set('toObject', { retainKeyOrder : true });

module.exports = mongoose.model('Todo', TodoSchema);