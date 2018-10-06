using System;

namespace Treehouse.FitnessFrog
{
      class Program
      {
          static void Main()
          {
                int runningTotal = 0;
                bool keepGoing = true;


                while (keepGoing)
                {           
                    //prompt for minutes exercised         
                    Console.Write("How many minutes have you exercised or type 'quit' to exit: ");
                    string entry = Console.ReadLine();
                    
                    if (entry == "quit"  || entry == "Quit" || entry == "q" || entry == "Q")
                    {
                        keepGoing = false;
                        Console.WriteLine("See you next time");
                    }
                    else
                    {
                        keepGoing = true;
                        
                        
                        try
                        {
                            int minutes = int.Parse(entry);

                            
                            if (minutes > 0)
                            {
                                //add minutes to total
                                runningTotal = runningTotal + minutes;

                                //display total minutes
                                Console.WriteLine("Total minutes exercised is: " + runningTotal);
                                
                                
                                if (minutes <= 15)
                                {
                                    Console.WriteLine("Not bad");
                                }
                                else if (minutes > 15 && minutes <= 30)
                                {
                                    Console.WriteLine("Pretty Good");
                                }
                                else if (minutes > 30)
                                {
                                    Console.WriteLine("Killing it!!");
                                }
                            }
                            else 
                            {
                                Console.WriteLine("You gotta work harder");
                            }
                        }
                        catch(FormatException)
                        {
                            Console.WriteLine("You need to enter a number, or type quit");
                        }
                        

                    }
                }


          }
      }
}