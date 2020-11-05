// import React from 'react';
import environment from 'src/config';
import {API_URL} from 'src/actions/utilAction';


export async function fetchOrders(Store, OrderStatus, Warehouse, Carrier, BillingAccount, ZIPCode, ItemNumber, UnitOrder, ShipToCountry, ShipToState, FromOrderDate, ToOrderDate) {
    debugger
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            Store: Store,
            OrderStatus: OrderStatus,
            Warehouse: Warehouse,
            Carrier: Carrier,
            BillingAccount: BillingAccount,
            ZIPCode: ZIPCode,
            ItemNumber: ItemNumber,
            UnitOrder: UnitOrder,
            ShipToCountry: ShipToCountry,
            ShipToState: ShipToState,
            FromOrderDate: FromOrderDate,
            ToOrderDate: ToOrderDate
        })
    };
    const fullResponse = await fetch(API_URL + GetOrders, requestOptions);
    const responseJson = await fullResponse.json();
    //For Get Stores Data
    return responseJson;
}



async function fetchFiltersData() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    };
    const fullResponse = await fetch(`${API_URL}api/Orders`, requestOptions);
    const responseJson = await fullResponse.json();

}


async function fetchGetFiltersData() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ColumnType: colType, ColumnValue: e })
    };
    const GetResponse = await fetch(`${API_URL}api/Orders/GetFiltersData`, requestOptions);
    const GetresponseJson = await GetResponse.json();
    return GetresponseJson;
}

async function fetchOrders(exportType) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            ExportType: exportType == 'selectedorder' ? 'selected' : exportType == 'matchingorder' ? 'matching' : 'Top5000',
            IdOrders: selectedUsers && selectedUsers.length && exportType == 'selectedorder' ? selectedUsers.toString() : '',
            Store: obj && obj.Store != '' ? obj.Store : '',
            OrderStatus: obj && obj.OrderStatus != '' ? obj.OrderStatus : '',
            Warehouse: obj && obj.Warehouse,
            Carrier: obj && obj.Carrier,
            BillingAccount: obj && obj.BillingAccount,
            ZIPCode: obj && obj.ZIPCode,
            ItemNumber: obj && obj.ItemNumber,
            UnitOrder: obj && obj.UnitOrder,
            ShipToCountry: obj && obj.ShipToCountry,
            ShipToState: obj && obj.ShipToState,
            FromOrderDate: obj && obj.FromOrderDate ? obj.FromOrderDate.toString() : '',
            ToOrderDate: obj && obj.ToOrderDate ? obj.ToOrderDate.toString() : ''
        })
    };

    const fullResponse = await fetch(`${API_URL}api/Orders/ExportOrderDetail`, requestOptions);
    const responseJson = await fullResponse.json();
    //For Get Stores Data

    setExportOrderDetail(responseJson.responseObject);
    if (exportType == 'matchingorder') {
        return setMatchingRecord(responseJson.responseObject && responseJson.responseObject.length);
    }

}