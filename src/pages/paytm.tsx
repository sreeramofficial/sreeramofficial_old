import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  div: {
    padding: 20,
    display: 'flex',
    margin: 'auto',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: 300,
    margin: 'auto',
    '&:first-child': {
      marginRight: 20,
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        marginBottom: 20,
      },
    },
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  const cards = [
    {
      id: 1,
      prevAmount: '$15',
      amount: `$10`,
      description: '1 year access to all paid content.',
      time: 'Premium',
    },
  ];

  return (
    <div className={classes.div}>
      {cards.map(({ id, prevAmount, amount, time, description }) => <Card key={id} className={classes.card}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Sreeram Padmanabhan'
            height='200'
            image='/sections/dev.svg'
            title='Sreeram Padmanabhan' />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {time}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='large' color='primary' disabled>
            <s>{prevAmount}</s>
          </Button>
          <Button size='large' color='primary' href={`/api/pay/premium?item=${id}`}>
            {amount}
          </Button>
        </CardActions>
      </Card>)}
    </div>
  );
}
