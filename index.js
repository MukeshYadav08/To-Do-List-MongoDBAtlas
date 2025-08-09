const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// ====== MongoDB Atlas Connection ======
mongoose.connect('mongodb+srv://mukeshyadav09082025:Cluster*008*@cluster0.shri65o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ====== Task Schema ======
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['urgent', 'high', 'low'], default: 'low' },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// ====== Middleware ======
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ====== Routes ======

// Home page - list all tasks
app.get('/', async (req, res) => {
  try {
    const { priority, msg, error } = req.query;
    let query = {};
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ _id: -1 });
    res.render('index', { tasks, msg, error });
  } catch (err) {
    res.render('index', { tasks: [], msg: null, error: 'Failed to load tasks' });
  }
});

// Add task (POST)
app.post('/tasks', async (req, res) => {
  const { title, priority } = req.body;

  if (!title || !title.trim()) {
    return res.redirect('/?error=Task title cannot be empty');
  }

  try {
    await Task.create({ title: title.trim(), priority });
    res.redirect('/?msg=Task added successfully');
  } catch (err) {
    res.redirect('/?error=Failed to add task');
  }
});

// Edit task (PUT)
app.put('/tasks/:id', async (req, res) => {
  const { updatedTitle, updatedPriority } = req.body;

  if (!updatedTitle || !updatedTitle.trim()) {
    return res.redirect('/?error=Task title cannot be empty');
  }

  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title: updatedTitle.trim(),
      priority: updatedPriority
    });
    res.redirect('/?msg=Task updated successfully');
  } catch (err) {
    res.redirect('/?error=Failed to update task');
  }
});

// Delete task (DELETE)
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/?msg=Task deleted successfully');
  } catch (err) {
    res.redirect('/?error=Failed to delete task');
  }
});

// Toggle completion (PUT)
app.put('/tasks/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/?error=Failed to toggle task');
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));