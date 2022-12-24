const ps = require('python-shell');

const options = {
    mode: 'json',
    scriptPath: 'python_scripts/'
};

function test_model(req, res) {
    ps.PythonShell.run('test_model.py', options, (err, results) => {
        if(err)
            res.status(404).json({err, error: 'could not test machine learning model'});
        else
            res.status(200).json(results);
    });
}

function make_prediction(req, res) {
    options['args'] = req.params.id
    ps.PythonShell.run('run_prediction.py', options, (err, results) => {
        if(err)
            res.status(404).json({err, error: 'could not run prediction'});
        else
            res.status(200).json(results);
    });
}

function get_all_cxls(req, res) {
    ps.PythonShell.run('all_cancellations.py', options, (err, results) => {
        if(err)
            res.status(404).json({err, error: 'could not get cancellation stats'});
        else
            res.status(200).json(results);
    });
}

function get_cxls_by_month(req, res) {
    ps.PythonShell.run('cancellations_by_month.py', options, (err, results) => {
        if(err)
            res.status(404).json({err, error: 'could not get cancellation by month stats'});
        else
            res.status(200).json(results);
    });
}

function get_cxls_by_feature(req, res) {
    ps.PythonShell.run('cancellations_by_feature.py', options, (err, results) => {
        if(err)
            res.status(404).json({err, error: 'could not get cancellation by feature stats'});
        else
            res.status(200).json(results);
    });
}

module.exports = {
    test_model,
    make_prediction,
    get_all_cxls,
    get_cxls_by_month,
    get_cxls_by_feature
};

