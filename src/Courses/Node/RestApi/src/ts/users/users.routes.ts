import * as restify from 'restify';
import {Routes} from '../common/routes';
import {User} from './users.model';

class UsersRoutes extends Routes {

    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }

    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
          User.find()
              .then(this.render(resp,next))
              .catch(next);
        });

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.post('/users', (req,resp,next) => {
            let user = new User(req.body);
            user.save()
                .then(this.render(resp,next))
                .catch(next);
        });

        application.put('/users/:id', (req,resp,next) => {
            let options = {
                new: true,
                overwrite: true
            };
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.patch('/users/:id', (req,resp,next) => {
            let options = {
                new: true
            };
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next);
        });

        application.del('/users/:id', (req,resp,next) => {
            User.findByIdAndDelete(req.params.id).then(user => {
                if (user) {
                    resp.send(204);
                } else {
                    resp.send(404);
                }
                return next();
            }).catch(next);
        });
    }
}

export const usersRoutes = new UsersRoutes();