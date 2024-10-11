import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getNews, getCategories, getSources } from "../../store/action";
import { capitaLize } from '../../utils';
import Loader from '../../components/Loader';
import { Col, Row, FormControl, FormSelect } from "react-bootstrap";
import DatePicker from "react-date-picker"
import { v4 as uuidv4 } from "uuid";
import NewsItem from '../../components/NewsItem/NewsItem';
import NoImage from '../../assets/images/no_image.png';



const Home = (props) => {

  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  const [publishedAt, setPublishedAt] = useState(null);
  const [sourceId, setSourceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  
  const useDebounce = (searchInputVal, delay) => {
    const [debounceValue, setDebounceValue] = useState(searchInputVal);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(searchInputVal);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchInputVal, delay]);
    return debounceValue;
  }

  const debounceValue = useDebounce(searchKeyword, 2000);
  useEffect(() => {
    fetchNews();
  }, [debounceValue]);


  useEffect(() => {
    fetchNews();
  }, [categoryId, sourceId, publishedAt]);

  const fetchNews = () => {
    const { getNews } = props;
    setLoading(true);

    let articlePublishedAt = null;
    if (publishedAt) {
      const publicationDate = new Date(publishedAt);
      articlePublishedAt = `${publicationDate.getFullYear()}-${publicationDate.getMonth() + 1}-${publicationDate.getDate()}`;
    }

    getNews({
      onSuccess: function (response) {
        if (response.success) {
          setNews(response.data.news);
          setLoading(false);
        }
      },
      onError: function (error) {
        setLoading(false);
        console.log("error news api", error);
      },
      params: {
        source_id: sourceId,
        category_id: categoryId,
        search_keyword: searchKeyword,
        published_at: articlePublishedAt
      }
    });
  }

  useEffect(() => {
    const { getCategories, getSources } = props;
    setLoading(true);

    getSources({
      onSuccess: function (response) {
        if (response.success) {
          setSources(response.data.sources);
        }
      },
      onError: function (error) {
        setLoading(false);
        console.log("error sources api", error);
      },
    });

    getCategories({
      onSuccess: function (response) {
        if (response.success) {
          setCategories(response.data.categories);
        }
      },
      onError: function (error) {
        setLoading(false);
        console.log("error categories api", error);
      },
    });

    fetchNews();
  }, []);


  return (
    <div className='news-container'>
      <Row className="text-center mt-4 mb-1">
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
            <FormControl type='text' placeholder='Search article...'  onChange={(e) => setSearchKeyword(e.target.value)}/>
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <DatePicker className="form-control" value={publishedAt} onChange={setPublishedAt} />
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <FormSelect onChange={(e) => setSourceId(e.target.value)} value={sourceId}>
            <option value="">Select Source</option>
            {sources.map((source) => {
              return (
                <option value={source.id} key={uuidv4()}>{ source.name }</option>
              )
            })}
          </FormSelect>
        </Col>
        <Col sm={12} md={6} lg={3} xl={3} className='mb-4'>
          <FormSelect onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
          <option value="">Select Category</option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={uuidv4()}>{ capitaLize(category.name)}</option>
              )
            })}
          </FormSelect>
        </Col>
      </Row>
      {loading ? <Loader /> : (
      <Row>
        {news.map((element) => {
          return (
            <Col sm={12} md={6} lg={4} xl={4} className='news-card' key={uuidv4()}>
              <NewsItem
                title={element.title}
                description={element.description}
                published={element.published_at}
                channel={''}
                alt="News image"
                publishedAt={element.published_at}
                imageUrl={
                  element.url_to_image === null ? NoImage : element.url_to_image
                }
                urlNews={element.url}
              />
            </Col>
          );
        })}
      </Row>
      )}
    </div>
  );


};


export default connect(null, {
  getNews,
  getCategories,
  getSources
})(Home);