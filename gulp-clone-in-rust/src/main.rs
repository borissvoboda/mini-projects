use std::fs;
use serde_json::Value;
use std::process::Command;

fn main() {
    let config_file = "controlfile.json"; // You can also accept this as an argument
    let config: Value = serde_json::from_str(&fs::read_to_string(config_file).unwrap()).unwrap();

    if let Some(tasks) = config["tasks"].as_array() {
        for task in tasks {
            if let Some(command) = task["command"].as_str() {
                let output = Command::new("sh")
                    .arg("-c")
                    .arg(command)
                    .output()
                    .expect("Failed to execute command");

                println!("Output: {}", String::from_utf8_lossy(&output.stdout));
            }
        }
    }
}