# Kitrtonik blocks for micro:bit

# pxt-kitronik-data-logger

Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)
This package is a generic software package that can be used with multiple [Kitronik products for BBC microbit](https://www.kitronik.co.uk/microbit)

# Setup Blocks

Set data for USB block will redirect the serial output to the USB port. If not used, serial output will default to USB
```blocks
Kitronik_Data_Logger.setDataForUSB()
```

Set data for serial block will redirect the serial output to the selected microbit pin and selected baud rate. If not used, serial output will default to USB
```blocks
Kitronik_Data_Logger.setDataForSerial(Kitronik_Data_Logger.PinList.P0, Kitronik_Data_Logger.PinList.P0, Kitronik_Data_Logger.BaudRate.BaudRate115200)
```

The seperator block allow the ability to set which charector from a range will mark the end of an entry (otherwise know as a delimiter), this allows the data to be able to copied into a csv file.
```blocks
Kitronik_Data_Logger.selectSeperator(Kitronik_Data_Logger.Seperator.tab)
```

The send entry number block will allow the user choose whether or not to output the entry numbers with the serial data 
```blocks
Kitronik_Data_Logger.optionSendEntryNumber(Kitronik_Data_Logger.ListNumber.Send)
```

The add title block will add a title to each coloumn of data to make it more user friendly to read
```blocks
Kitronik_Data_Logger.addTitle(" ")
```

# Entries Blocks

Add Data block is the method of adding an entry into the data.  It will store upto 100 entries before rolling the data.  Data is stored in a string format
```blocks
Kitronik_Data_Logger.addData(" ")
```

Convert Number will give the ability to convert a number to string so that it can be stored into the add data block
```blocks
Kitronik_Data_Logger.addData(Kitronik_Data_Logger.convertNumber(0))
```

Clear Data will clear all the stored data
```blocks
Kitronik_Data_Logger.clearData()
```

#Transfer Blocks

Send All Data will output all the stored data to the serial port, block will default to USB unless stated in the setup blocks.
```blocks
Kitronik_Data_Logger.sendAllData()
```

Send All Data will output the selection data entry to the serial port, block will default to USB unless stated in the setup blocks.
```blocks
Kitronik_Data_Logger.sendSelectedData(1)
```
