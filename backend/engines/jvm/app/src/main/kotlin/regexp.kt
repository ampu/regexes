#!kotlinc -script

import java.util.regex.*
import kotlin.system.exitProcess
import kotlinx.serialization.*
import kotlinx.serialization.json.*

class Regexp {}

@Serializable
data class Error(val engineValue: String, val error: String) {
    fun exit() {
      println(Json { prettyPrint = true }.encodeToString(this))
      exitProcess(0)
    }
}

@Serializable
data class Matches(val engineValue: String, val matches: List<Match>) {
    fun exit() {
        println(Json { prettyPrint = true }.encodeToString(this))
        exitProcess(0)
    }
}

@Serializable
data class Match(val index: Int, val substring: String) {}

fun main(args: Array<String>) {
    val engineValue = if (args.size > 0) args[0] else ""
    val text = if (args.size > 1) args[1] else null
    val patternValue = if (args.size > 2) args[2] else null
    val flagsValue = if (args.size > 3) args[3] else ""

    if (patternValue === null) {
        Error(engineValue, "invalid regexp").exit();
    }

    if (text === null) {
        Error(engineValue, "invalid input").exit();
    }

    // val (_, pattern, flags) = Regex("^/(.*)/(.*)$", RegexOption.DOT_MATCHES_ALL).find(patternValue!!)?.groupValues
    //    ?: arrayListOf(null , patternValue, null)

    var regexpObject: Regex? = null
    try {
        regexpObject = if (flagsValue === "") patternValue!!.toRegex() else ("(?" + flagsValue + ")" + patternValue).toRegex();
    }
    catch (e: Exception) {
        Error(engineValue, "invalid regexp").exit();
    }

    val results = regexpObject!!.findAll(text!!);
    val matches = results.map { Match(it.range.start, it.value) }.toList()

    Matches(engineValue, matches).exit();
}
