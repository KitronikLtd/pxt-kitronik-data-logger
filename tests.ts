//button A will output all the stored data
input.onButtonPressed(Button.A, function () {
    basic.showString("T")
    Kitronik_Data_Logger.sendAllData()
    basic.clearScreen()
})
//button B will output a selected location e.g.5
input.onButtonPressed(Button.B, function () {
    Kitronik_Data_Logger.sendSelectedData(5)
})
//set of data to USB serial, selected delimiter, added title of each coloumn
Kitronik_Data_Logger.setDataForUSB()
Kitronik_Data_Logger.selectSeperator(Kitronik_Data_Logger.Seperator.space)
Kitronik_Data_Logger.addTitle("X", "Y", "Z")

//loop forever adding the data the the array
basic.forever(function () {
        Kitronik_Data_Logger.addData(Kitronik_Data_Logger.convertNumber(input.acceleration(Dimension.X)), Kitronik_Data_Logger.convertNumber(input.acceleration(Dimension.Y)), Kitronik_Data_Logger.convertNumber(input.acceleration(Dimension.Z)))
})