import {Pressable} from 'react-native';
import React from 'react';
import {useTheme, Card} from 'react-native-paper';

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
};
const CardItem = (props: Props) => {
  const theme = useTheme();

  return (
    <Pressable>
      <Card
        style={{
          marginVertical: 10,
          backgroundColor: theme.colors.elevation.level5,
        }}>
        <Card.Cover
          borderRadius={10}
          source={
            props.image_url
              ? {uri: props.image_url}
              : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/forstoringimages-364e6.appspot.com/o/NoImageFound.jpg.png?alt=media&token=8167afe0-fd72-4ef4-b5f5-63e8209e691f',
                }
          }
        />
        <Card.Title
          title={props.title}
          subtitle={props.description}
          titleNumberOfLines={1}
        />
      </Card>
    </Pressable>
  );
};

export default CardItem;
