import React, { useState, useEffect } from 'react';
import { Plataform , RefreshControl} from 'react-native'; //verificar plataforma que o dispositivo esta rodando
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions'; //pedir permissão para localização
import Geolocation from '@react-native-community/geolocation'; //pedir permissão para localização

import Api from '../../Api';

import {Container,
        Scroller,

        HeaderArea,
        HeaderTitle,
        SearchButton,

        LocationArea,
        LocationInput,
        LocationFinder,

        LoadingIcon,
        ListArea
} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationFinder from '../../assets/my_location.svg';

export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ? //verificar onde o dispositivo esta rodando
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result == 'granted') {
            
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=>{
                // console.log(info);
                setCoords(info.coords);
                getBarbers();
            });

        } 
    }

    
    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat, lng, locationText);
        console.log(res);
        if (res.error == '') {
            if (res.loc) {
                setLocationText(res.loc);
            }
            setList(res.data);
        } else {
            alert("Erro: lll" + res.erro);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    return (

        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre seu barbeiro preferido</HeaderTitle>
                    <SearchButton  onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width=" 26" height="26" fill="#FFFFFF"/>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationFinder width=" 24" height="24" fill="#FFFFFF"/>
                    </LocationFinder>
                </LocationArea>

                {loading &&   
                    <LoadingIcon size="large" color="#FFFFFF"/>
                }

                <ListArea>
                    {list.map((item,k)=>(
                        <BarberItem key={k} data={item}/> 
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}