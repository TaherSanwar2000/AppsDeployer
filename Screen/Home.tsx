import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NewsData} from '../utils/type';
import {ProgressBar} from 'react-native-paper';
import CardItem from '../component/CardItem';

const Home = () => {
  const API = 'pub_209615da3098c5369a4b0407b2db888bd0bd2';
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setISLoading] = useState(false);

  useEffect(() => {
    handlePress();
  }, []);

  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API}&country=in&language=en${
      nextPage?.length > 0 ? `&page=${nextPage}` : ' '
    }`;
    try {
      setISLoading(true);
      await fetch(URL)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setNewsData(prev => [...prev, ...data.results]);
          setNextPage(data.nextPage);
        });
      setISLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <ProgressBar
        visible={isLoading}
        indeterminate
        color="red"
        style={{marginVertical: 10}}
      />
      <View>
        <FlatList
          keyExtractor={item => item.title}
          onEndReached={() => handlePress()}
          style={{}}
          data={newsData}
          renderItem={({item}) => (
            <CardItem
              description={item.description}
              image_url={item.image_url}
              title={item.title}
              content={item.content}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Home;
