/**
 * Kitronik Data Logger blocks
 **/
//% weight=100 color=#00A654 icon="\uf233" block="Data Logger"
//% groups='["Setup", "Entries", "Transfer"]'
namespace Kitronik_Data_Logger {
    let NONE = 0
    let USB = 1
    let PIN = 2

    let storedList: string[] = []
    let delimiter = " "
    let entryNumber = false
    let listLimit = 100
    let comms = NONE
    let entryBuild = ""
    let titleBuild = ""
    let kitronikHeader = " Kitronik Data Logger\r\n----------------------\r\n  www.kitronik.co.uk\r\n\r\n"
    export enum ListNumber{
        //% block="Send"
        Send,
        //% block="Dont Send"
        DontSend
    };

    export enum PinList{
        //% block="P0"
        P0 = 7,
        //% block="P1"
        P1 = 8,
        //% block="P2"
        P2 = 9,
        //% block="P8"
        P8 = 15,
        //% block="P12"
        P12 = 19,
        //% block="P13"
        P13 = 20,
        //% block="P14"
        P14 = 21,
        //% block="P15"
        P15 = 22,
        //% block="P16"
        P16 = 23
    };
    
    export enum BaudRate {
      //% block=115200
      BaudRate115200,
      //% block=57600
      BaudRate57600,
      //% block=38400
      BaudRate38400,
      //% block=31250
      BaudRate31250,
      //% block=28800
      BaudRate28800,
      //% block=19200
      BaudRate19200,
      //% block=14400
      BaudRate14400,
      //% block=9600
      BaudRate9600,
      //% block=4800
      BaudRate4800,
      //% block=2400
      BaudRate2400,
      //% block=1200
      BaudRate1200
    };
    
    export enum Seperator {
      //% block="Tab"
      tab,
      //% block="Semicolon"
      semicolon,
      //% block="Comma"
      comma,
      //% block="Space"
      space
    };
    
    function sortSelection(selection: number){
        let pin;
        switch (selection)
        {
            case PinList.P0:
                pin = SerialPin.P0
                break;
            case PinList.P1:
                pin = SerialPin.P1
                break;
            case PinList.P2:
                pin = SerialPin.P2
                break;
            case PinList.P8:
                pin = SerialPin.P8
                break;
            case PinList.P12:
                pin = SerialPin.P12
                break;
            case PinList.P12:
                pin = SerialPin.P12
                break;
            case PinList.P13:
                pin = SerialPin.P13
                break;
            case PinList.P14:
                pin = SerialPin.P14
                break;
            case PinList.P15:
                pin = SerialPin.P15
                break;
            case PinList.P16:
                pin = SerialPin.P16
                break;
            case BaudRate.BaudRate115200:
                pin = 115200
                break;
            case BaudRate.BaudRate57600:
                pin = 57600
                break;
            case BaudRate.BaudRate38400:
                pin = 38400
                break;
            case BaudRate.BaudRate31250:
                pin = 31250
                break;
            case BaudRate.BaudRate28800:
                pin = 28800
                break;
            case BaudRate.BaudRate19200:
                pin = 19200
                break;
            case BaudRate.BaudRate14400:
                pin = 14400
                break;
            case BaudRate.BaudRate9600:
                pin = 9600
                break;
            case BaudRate.BaudRate4800:
                pin = 4800
                break;
            case BaudRate.BaudRate2400:
                pin = 2400
                break;
            case BaudRate.BaudRate1200:
                pin = 1200
                break;
        }   
        return pin
    }

    function checkAndAdd(addText: any, stringBuild: string): void{
        if (addText){
            let anyText = convertToText(addText)
            let build = ""
            if (stringBuild == "entry")
                build = entryBuild
            else if (stringBuild == "title")
                build = titleBuild

            if (anyText.length >= 10)
                build = build + anyText.substr(0, 10) + delimiter
            else {
                let numberSpace = 10 - anyText.length
                for (let whitespace=0; whitespace < numberSpace; whitespace++){
                    anyText = anyText + " "
                }
                build = build + anyText + delimiter
            }
            
            if (stringBuild == "entry")
                entryBuild = build
            else if (stringBuild == "title")
                titleBuild = build
        }
    }
    
    function sendTitle(): void{
        if (titleBuild){
            if (entryNumber == true){
                serial.writeString("   " + delimiter + titleBuild)
            }
            else {
                serial.writeString(titleBuild)
            }
            serial.writeString("\r\n")
        }
    }

    /**
     * Set the output of logged data to the USB, default baudrate is 115200
     */
    //% group=Setup
    //% weight=100 blockGap=8
    //% blockId="kitronik_Data_Logger_output_to_usb"
    //% block="data output on USB"
    export function setDataForUSB() {
        comms = USB
        serial.redirectToUSB()
    }

    /**
     * Choice of which pins to connect the data output and the selected baud rate
     * @param tx is the selection of pin microbit transmitting data
     * @param rx is the selection of pin microbit receiving data
     * @param rate is the selection of BaudRate speed
     */
    //% group=Setup
    //% weight=95 blockGap=8
    //% blockId="kitronik_Data_Logger_output_to_serial"
    //% block="data output on TX %tx |RX %rx |baud rate %rate|"
    export function setDataForSerial(tx: PinList, rx: PinList, rate: BaudRate): void{
        comms = PIN
        let txn = sortSelection(tx)
        let rxn = sortSelection(rx)
        let dataRate = sortSelection(rate)
        serial.redirect(txn, rxn, dataRate)
    }
    
    /**
     * Choice of what charector to seperate between each data entries.  Default not using this block is space
     * @param seperate is the choice charector to split each entry in the log
     */
    //% group=Setup
    //% weight=90 blockGap=8
    //% blockId="kitronik_Data_Logger_select_seperator"
    //% block="seperate entries with %charSelect"
    export function selectSeperator(charSelect: Seperator): void{
        if (charSelect == Seperator.tab)
            delimiter = "\t"
        else if (charSelect == Seperator.semicolon)
            delimiter = ";"
        else if (charSelect == Seperator.comma)
            delimiter = ","
        else if (charSelect == Seperator.space)
            delimiter = " "
    }
    
    /**
     * Choice whether the send or not the data entry location
     * @param sendSelection is the choice of yes or no from the enum
     */
    //% group=Setup
    //% weight=85 blockGap=8
    //% blockId="kitronik_Data_Logger_entry_numbers"
    //% block="%sendSelection| entry locations with data "
    export function optionSendEntryNumber(sendSelection: ListNumber): void{
        if (sendSelection == ListNumber.Send)
            entryNumber = true
        else if (sendSelection == ListNumber.DontSend)
            entryNumber = false
    }

    /**
     * Input title of saved data as a coloumn header, logged in string format. Titles will only output the first 8 charectors of the string.
     * Maximum of 100 entries stored
     * @param title1 of any title to save eg: " "
     * @param title2 of any title to save eg: " " 
     * @param title3 of any title to save eg: " "
     * @param title4 of any title to save eg: " "
     * @param title5 of any title to save eg: " "
     * @param title6 of any title to save eg: " "
     * @param title7 of any title to save eg: " "
     * @param title8 of any title to save eg: " "
     * @param title9 of any title to save eg: " "
     * @param title10 of any title to save eg: " "
     */
    //% group=Setup
    //% weight=83 blockGap=8
    //% blockId="kitronik_Data_Logger_entry_title"
    //% block="add titles to entries %title1|| %title2 %title3 %title4 %title5 %title6 %title7 %title8 %title9 %title10"
    //% duration.shadow=timePicker
    //% expandableArgumentMode="enable" inlineInputMode=inline
    export function addTitle(title1: any, title2?: any, title3?: any, title4?: any, title5?: any, title6?: any, title7?: any, title8?: any, title9?: any, title10?: any): void{
        checkAndAdd(title1, "title")
        checkAndAdd(title2, "title")
        checkAndAdd(title3, "title")
        checkAndAdd(title4, "title")
        checkAndAdd(title5, "title")
        checkAndAdd(title6, "title")
        checkAndAdd(title7, "title")
        checkAndAdd(title8, "title")
        checkAndAdd(title9, "title")
        checkAndAdd(title10, "title")
    }

    /**
     * Input data to be saved to the logger in string format.  To save numbers, convert numbers to a string.
     * @param entry1 of any data to save eg: " "
     * @param entry2 of any data to save eg: " "
     * @param entry3 of any data to save eg: " "
     * @param entry4 of any data to save eg: " "
     * @param entry5 of any data to save eg: " "
     * @param entry6 of any data to save eg: " "
     * @param entry7 of any data to save eg: " "
     * @param entry8 of any data to save eg: " "
     * @param entry9 of any data to save eg: " "
     * @param entry10 of any data to save eg: " "
     */
    //% group=Entries
    //% weight=80 blockGap=8
    //% blockId="kitronik_Data_Logger_add"
    //% block="add data %entry1|| %entry2 %entry3 %entry4 %entry5 %entry6 %entry7 %entry8 %entry9 %entry10"
    //% duration.shadow=timePicker
    //% expandableArgumentMode="enable" inlineInputMode=inline
    export function addData(entry1: any, entry2?: any, entry3?: any, entry4?: any, entry5?: any, entry6?: any, entry7?: any, entry8?: any, entry9?: any, entry10?: any): void{
        if (comms == NONE)
            setDataForUSB()
        entryBuild = ""

        checkAndAdd(entry1, "entry")
        checkAndAdd(entry2, "entry")
        checkAndAdd(entry3, "entry")
        checkAndAdd(entry4, "entry")
        checkAndAdd(entry5, "entry")
        checkAndAdd(entry6, "entry")
        checkAndAdd(entry7, "entry")
        checkAndAdd(entry8, "entry")
        checkAndAdd(entry9, "entry")
        checkAndAdd(entry10, "entry")

        if (entryBuild != " ")
        {
            entryBuild = entryBuild + "\r\n"
            if (storedList.length < listLimit){
                storedList.push(entryBuild)
            }
            else if (storedList.length == listLimit){
                let remove = storedList.shift()
                storedList.push(entryBuild)
            }
        }
    }

    /**
     * Clears all data in the list.
     */
    //% group=Entries
    //% weight=70 blockGap=8
    //% blockId="kitronik_Data_Logger_clear"
    //% block="clear all data"
    export function clearData(): void{
        storedList = []
    }

    /**
     * Send all the stored data via comms selected
     * Maximum of 100 positions stored
     */
    //% group=Transfer
    //% weight=65 blockGap=8
    //% blockId="kitronik_Data_Logger_send_all"
    //% block="send all data via comms"
    export function sendAllData(): void{
        if (comms == NONE)
            setDataForUSB()
        
        serial.writeString(kitronikHeader)
        sendTitle()
        
        let position = 0
        for (position = 0; position <= (storedList.length-1); position++)
        {
            if (entryNumber == true){
                let positionString = convertToText(position+1)
                if (positionString.length == 1)
                    positionString = "  " + positionString
                else if (positionString.length == 2)
                    positionString = " " + positionString
                serial.writeString(positionString + delimiter)
            }
            serial.writeString(storedList[position])
        }
        serial.writeString("\r\n")
    }

    /**
     * Send selected position the stored data via comms selected.
     * If entered position is greater than the total number of enteries, the max entry position is outputted.
     * @param position is the location of required data to be sent
     */
    //% group=Transfer
    //% weight=60 blockGap=8
    //% blockId="kitronik_Data_Logger_send_selected"
    //% block="send entry %position data via comms"
    //% position.min=1 position.max=100 position.defl=1
    export function sendSelectedData(position: number): void{
        if (comms == NONE)
            setDataForUSB()
        if (storedList.length < position){
            position = storedList.length
        }
        let dataEntry = storedList[position-1]
        
        serial.writeString(kitronikHeader)
        sendTitle()
        
        if (entryNumber == true){
            let positionString = convertToText(position+1)
            if (positionString.length == 1)
                positionString = "  " + positionString
            else if (positionString.length == 2)
                positionString = " " + positionString
            serial.writeString(positionString + delimiter)
        }

        serial.writeString(dataEntry)
        serial.writeString("\r\n")
    }
} 