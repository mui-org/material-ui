import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function ActionableCard() {
  return (
    <React.Fragment>
      <Card href="#primary-action" sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardHeader title="Lizard" />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={() => alert('Favorite clicked')}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={() => alert('Share clicked')}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Card onClick={() => alert('Card clicked')} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardHeader title="Lizard" />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={() => alert('Favorite clicked')}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={() => alert('Share clicked')}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
