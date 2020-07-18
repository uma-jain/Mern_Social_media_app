import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  }
});
export class UpdatePost extends Component {
    
state = {
    postText: this.props.post.text
  };
  handleChange = (e) => {
    const postText = e.target.value;
    this.setState(() => ({ postText }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postText } = this.state;
    const { post, updatePost, handleModalClose } = this.props;
   
    updatePost(post._id, postText, post.author);
    handleModalClose();
  };

    render() {
        const { postText } = this.state;
        const { classes } = this.props;
        return (
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="textarea"
              placeholder="What's on your mind?"
              multiline
              className={classes.textField}
              margin="normal"
              rowsMax="5"
              value={postText}
              onChange={this.handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Update
            </Button>
          </form>
        );
      }
}

export default withStyles(styles)(UpdatePost)

